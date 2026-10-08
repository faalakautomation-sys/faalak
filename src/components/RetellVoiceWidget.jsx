import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RetellWebClient } from "retell-client-js-sdk";
import { FiMessageCircle, FiMic, FiPhone, FiPhoneOff, FiSend, FiUser, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const API_HEADERS = {
  "Content-Type": "application/json",
  ...(API_BASE_URL.includes("ngrok") ? { "ngrok-skip-browser-warning": "true" } : {}),
};

// Matches Tailwind's bottom-6 (1.5rem) - the button's normal resting gap
// above the viewport edge before the footer ever enters the picture.
const BASE_DOCK_OFFSET = 24;
// Extra breathing room once it's resting above the footer row, so it isn't
// touching the Data Privacy & Security / social icons line.
const FOOTER_CLEARANCE = 16;
// Vertical gap between the launcher button and the greeting bubble/panel
// above it (Tailwind's bottom-24 vs bottom-6, i.e. 96px - 24px).
const PANEL_OFFSET_ABOVE_BUTTON = 72;

const RetellVoiceWidget = () => {
  const clientRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [status, setStatus] = useState("idle");
  const [mode, setMode] = useState("voice");
  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });
  const [chatSessionId, setChatSessionId] = useState("");
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [isEndingChat, setIsEndingChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", message: "Hi, I’m Maya. What can I help you with?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);
  const chatEndRef = useRef(null);
  const chatSessionPromiseRef = useRef(null);
  const [dockOffset, setDockOffset] = useState(BASE_DOCK_OFFSET);

  // Keeps the widget from ever floating on top of the footer's bottom row -
  // as that row scrolls up into view, this pushes the button (and whatever's
  // open above it) up by exactly how much of the row is now on-screen, so it
  // comes to rest just above "Data Privacy & Security / Twitter / LinkedIn"
  // instead of covering it.
  useEffect(() => {
    const updateDockOffset = () => {
      const footerRow = document.getElementById("footer-bottom-row");
      if (!footerRow) {
        setDockOffset(BASE_DOCK_OFFSET);
        return;
      }
      const overlap = window.innerHeight - footerRow.getBoundingClientRect().top;
      setDockOffset(overlap > BASE_DOCK_OFFSET ? overlap + FOOTER_CLEARANCE : BASE_DOCK_OFFSET);
    };

    updateDockOffset();
    window.addEventListener("scroll", updateDockOffset, { passive: true });
    window.addEventListener("resize", updateDockOffset);
    return () => {
      window.removeEventListener("scroll", updateDockOffset);
      window.removeEventListener("resize", updateDockOffset);
    };
  }, []);

  useEffect(() => {
    const client = new RetellWebClient();
    clientRef.current = client;

    // Lets other parts of the site (e.g. LiveDemo's "Call me now" form) open
    // this widget pre-filled and already dialing, instead of just popping it
    // open empty and making the visitor retype what they just entered.
    // event.detail: { name, phoneNumber, autoStart }.
    const openWidget = (event) => {
      const detail = event.detail || {};
      setShowGreeting(false);
      setIsOpen(true);
      setMode("voice");

      if (detail.name || detail.phoneNumber) {
        const prefilled = { name: detail.name || "", phoneNumber: detail.phoneNumber || "" };
        setFormData(prefilled);
        if (detail.autoStart) {
          startVoiceAgent(prefilled);
        }
      }
    };

    const handleCallStarted = () => setStatus("active");
    const handleCallEnded = () => {
      setStatus("idle");
      // Always ask again next time - even for a second call in the same
      // widget-open session, not just after closing and reopening it.
      setFormData({ name: "", phoneNumber: "" });
    };
    const handleCallError = () => {
      setStatus("error");
      toast.error("The voice agent could not connect. Please try again.");
    };

    client.on("call_started", handleCallStarted);
    client.on("call_ended", handleCallEnded);
    client.on("error", handleCallError);
    window.addEventListener("open-retell-widget", openWidget);

    return () => {
      client.stopCall();
      client.removeListener("call_started", handleCallStarted);
      client.removeListener("call_ended", handleCallEnded);
      client.removeListener("error", handleCallError);
      window.removeEventListener("open-retell-widget", openWidget);
    };
  }, []);

  useEffect(() => {
    if (mode === "chat") chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatMessages, mode]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  // Takes the name/phone to call as a plain object rather than reading
  // `formData` off closure - lets it be called either from the form's own
  // submit (with the latest typed state) or straight from the
  // open-retell-widget event's detail, before that state has even been set.
  const startVoiceAgent = async (data) => {
    if (!data.name?.trim() || !data.phoneNumber?.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    setStatus("connecting");

    try {
      const response = await fetch(`${API_BASE_URL}/retell/web-call`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({ name: data.name.trim(), phoneNumber: data.phoneNumber.trim() }),
      });
      const result = await response.json();

      if (!response.ok || !result.accessToken) {
        throw new Error(result.error || "Unable to create the Retell call");
      }

      await clientRef.current.startCall({ accessToken: result.accessToken });
    } catch (error) {
      console.error("Retell voice call failed:", error);
      setStatus("error");
      toast.error(error.message || "Unable to start the voice agent.");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    startVoiceAgent(formData);
  };

  const ensureChatSession = () => {
    if (chatSessionId) return Promise.resolve(chatSessionId);
    if (chatSessionPromiseRef.current) return chatSessionPromiseRef.current;

    setIsStartingChat(true);
    chatSessionPromiseRef.current = fetch(`${API_BASE_URL}/retell/chat/session`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        name: formData.name.trim() || undefined,
        phoneNumber: formData.phoneNumber.trim() || undefined,
      }),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.chatId) {
          throw new Error(result.error || "Unable to start a chat session");
        }
        setChatSessionId(result.chatId);
        return result.chatId;
      })
      .catch((error) => {
        chatSessionPromiseRef.current = null;
        throw error;
      })
      .finally(() => setIsStartingChat(false));

    return chatSessionPromiseRef.current;
  };

  const handleChatModeSelect = () => {
    if (isEndingChat) return;
    setMode("chat");
    ensureChatSession().catch((error) => {
      toast.error(error.message || "Unable to prepare chat right now.");
    });
  };

  const resetChatSession = () => {
    setChatSessionId("");
    chatSessionPromiseRef.current = null;
    setChatMessages([{ sender: "bot", message: "Hi, I’m Maya. What can I help you with?" }]);
    setChatInput("");
  };

  const finishChatSession = async () => {
    let activeChatId = chatSessionId;
    if (!activeChatId && chatSessionPromiseRef.current) {
      try {
        activeChatId = await chatSessionPromiseRef.current;
      } catch {
        return;
      }
    }
    if (!activeChatId) return;

    const response = await fetch(`${API_BASE_URL}/retell/chat/end`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        chatId: activeChatId,
        name: formData.name.trim() || undefined,
        phoneNumber: formData.phoneNumber.trim() || undefined,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (result.conversationEnded) {
      resetChatSession();
    }
    if (!response.ok) {
      throw new Error(result.error || "The chat could not be saved.");
    }
  };

  const handleVoiceModeSelect = async () => {
    if (mode === "chat") {
      setIsEndingChat(true);
      try {
        await finishChatSession();
      } catch (error) {
        toast.error(error.message || "Unable to finish the chat right now.");
        return;
      } finally {
        setIsEndingChat(false);
      }
    }
    setMode("voice");
  };

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message || isSendingChat || isEndingChat) return;

    setChatInput("");
    setChatMessages((previous) => [...previous, { sender: "user", message }]);
    setIsSendingChat(true);

    try {
      const activeChatId = await ensureChatSession();

      const response = await fetch(`${API_BASE_URL}/retell/chat/message`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          chatId: activeChatId,
          message,
          name: formData.name.trim() || undefined,
          phoneNumber: formData.phoneNumber.trim() || undefined,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.error || "Unable to send your message");
      }
      const replies = (result.replies || []).filter((reply) => typeof reply === "string" && reply.trim());
      if (!replies.length) throw new Error("Maya did not return a text reply");
      setChatMessages((previous) => [...previous, ...replies.map((reply) => ({ sender: "bot", message: reply }))]);
    } catch (error) {
      setChatMessages((previous) => [...previous, {
        sender: "bot",
        message: "I couldn’t send that message right now. Please try again or switch to a voice call.",
      }]);
      toast.error(error.message || "Chat is temporarily unavailable.");
    } finally {
      setIsSendingChat(false);
    }
  };

  const stopVoiceAgent = () => {
    clientRef.current?.stopCall();
    setStatus("idle");
  };

  const closeWidget = async () => {
    if (status === "active" || status === "connecting" || isSendingChat || isEndingChat) return;
    setIsEndingChat(true);
    try {
      await finishChatSession();
      setIsOpen(false);
      setMode("voice");
      setStatus("idle");
      setShowGreeting(false);
      setFormData({ name: "", phoneNumber: "" });
    } catch (error) {
      toast.error(error.message || "Unable to finish the chat right now.");
    } finally {
      setIsEndingChat(false);
    }
  };

  const isCalling = status === "active" || status === "connecting";

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          if (isOpen) {
            if (isCalling) {
              setIsOpen(false);
            } else {
              closeWidget();
            }
          } else {
            setShowGreeting(false);
            setIsOpen(true);
          }
        }}
        aria-label="Open Maya chat and voice assistant"
        style={{ bottom: dockOffset }}
        className="fixed right-6 z-9997 flex h-14 items-center gap-3 rounded-full bg-[#075bd8] px-5 text-white shadow-[0_12px_28px_rgba(7,91,216,0.28)] transition hover:-translate-y-0.5 hover:bg-[#064fbd]"
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#ff4b9b] via-[#9b7cff] to-[#24d5ff] shadow-inner">
          <FiMic className="h-4 w-4 text-white" />
        </span>
        <span className="text-sm font-semibold tracking-tight">Talk to Maya</span>
        {isOpen && <FiX className="ml-1 h-4 w-4" />}
      </motion.button>

      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            style={{ bottom: dockOffset + PANEL_OFFSET_ABOVE_BUTTON }}
            className="fixed right-6 z-9996 w-[320px] max-w-[calc(100vw-32px)] rounded-lg bg-white px-4 py-4 text-slate-800 shadow-[0_14px_38px_rgba(15,23,42,0.16)] ring-1 ring-slate-200"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold tracking-tight">Hi! Want to talk to our AI assistant?</p>
              <button type="button" onClick={() => setShowGreeting(false)} className="shrink-0 text-xs text-slate-500 transition hover:text-slate-900">Close</button>
            </div>
            <p className="mt-3 text-xs font-medium text-slate-400">Maya</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            aria-label="Maya chat and voice assistant"
            style={{ bottom: dockOffset + PANEL_OFFSET_ABOVE_BUTTON }}
            className="fixed right-6 z-9996 flex max-h-[calc(100dvh-120px)] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-[0_20px_55px_rgba(15,23,42,0.18)]"
          >
            <div className="relative shrink-0 overflow-hidden border-b border-slate-100 px-6 pb-5 pt-6">
              <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-sky-100 blur-3xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#075bd8]">Faalak AI</p>
                  <h2 className="max-w-62.5 text-2xl font-semibold leading-tight text-slate-900">Talk with Maya.</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#075bd8]">
                  <FiMic className="h-5 w-5" />
                </div>
              </div>
              <p className="relative mt-3 text-sm leading-6 text-slate-500">
                {mode === "chat" ? "Send Maya a message, or switch to voice for a live conversation." : "Share your details first, then speak directly with our AI voice assistant."}
              </p>
              <div className="relative mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Choose chat or voice">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "chat"}
                  disabled={isCalling || isEndingChat || isSendingChat}
                  onClick={handleChatModeSelect}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${mode === "chat" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <FiMessageCircle className="h-4 w-4" /> Chat
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "voice"}
                  disabled={isCalling || isEndingChat || isSendingChat}
                  onClick={handleVoiceModeSelect}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${mode === "voice" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <FiMic className="h-4 w-4" /> Voice
                </button>
              </div>
            </div>

            {mode === "chat" ? (
              <div className="flex min-h-0 flex-1 flex-col bg-slate-50">
                <div className="grid shrink-0 grid-cols-2 gap-2 border-b border-slate-200 bg-white px-4 py-3">
                  <label>
                    <span className="sr-only">Your name (optional)</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isEndingChat}
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Name (optional)"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                    />
                  </label>
                  <label>
                    <span className="sr-only">Phone number (optional)</span>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={isEndingChat}
                      maxLength={40}
                      autoComplete="tel"
                      placeholder="Phone (optional)"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={closeWidget}
                    disabled={isSendingChat || isEndingChat}
                    className="col-span-2 justify-self-end text-xs font-semibold text-slate-500 transition hover:text-rose-600 disabled:cursor-wait disabled:opacity-50"
                  >
                    {isEndingChat ? "Ending chat..." : "End chat"}
                  </button>
                </div>
                <div className="min-h-44 flex-1 space-y-3 overflow-y-auto px-5 py-5" aria-live="polite" aria-label="Chat messages">
                  {chatMessages.map((item, index) => (
                    <div key={`${chatSessionId}-${index}`} className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <p className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-5 ${item.sender === "user" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-700"}`}>
                        {item.message}
                      </p>
                    </div>
                  ))}
                  {(isStartingChat || isSendingChat) && <p className="text-xs text-slate-400">{isStartingChat ? "Connecting to Maya..." : "Maya is replying..."}</p>}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleChatSubmit} className="flex shrink-0 items-end gap-2 border-t border-slate-200 bg-white p-4">
                  <label className="sr-only" htmlFor="maya-chat-message">Message Maya</label>
                  <textarea
                    id="maya-chat-message"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    rows={1}
                    maxLength={2000}
                    placeholder="Write a message..."
                    disabled={isEndingChat}
                    className="max-h-24 min-h-11 flex-1 resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
                  />
                  <button type="submit" disabled={!chatInput.trim() || isSendingChat || isEndingChat} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message">
                    <FiSend className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : status === "active" ? (
              <div className="bg-slate-50 px-6 py-7 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 ring-8 ring-blue-50">
                  <FiMic className="h-8 w-8 animate-pulse text-[#075bd8]" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">You are connected</h3>
                <p className="mt-2 text-sm text-slate-500">Maya is listening. You can start speaking.</p>
                <button type="button" onClick={stopVoiceAgent} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
                  <FiPhoneOff className="h-4 w-4" /> End call
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="bg-slate-50 px-6 py-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Your name</span>
                    <span className="relative block">
                      <FiUser className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Jane Smith" autoComplete="name" disabled={isCalling} className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </span>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Phone number</span>
                    <span className="relative block">
                      <FiPhone className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+1 416 555 0199" autoComplete="tel" disabled={isCalling} className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </span>
                  </label>
                </div>
                <button type="submit" disabled={isCalling} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#075bd8] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#064fbd] disabled:cursor-wait disabled:opacity-70">
                  {status === "connecting" ? "Connecting..." : <><FiMic className="h-4 w-4" /> Start voice call</>}
                </button>
                {status === "error" && <p className="mt-3 text-center text-xs text-rose-600">Connection failed. Check your details and try again.</p>}
                <p className="mt-4 text-center text-xs leading-5 text-slate-400">Your details are used only to start this demo call.</p>
              </form>
            )}

            {!isCalling && <button type="button" onClick={closeWidget} disabled={isSendingChat || isEndingChat} className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-900 disabled:cursor-wait disabled:opacity-50" aria-label="End chat and close Maya assistant"><FiX className="h-5 w-5" /></button>}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default RetellVoiceWidget;
