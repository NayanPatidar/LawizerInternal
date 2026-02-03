"use client";

import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { Send } from "lucide-react";
import { db } from "@/lib/firebaseClient";
import { useAuth } from "@/context/authContext";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Message = {
  id: string;
  senderId: string;
  senderRole: "USER" | "LAWIZER_EXPERT";
  text: string | null;
  createdAt?: any;
};

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export default function ServiceChat({
  serviceId,
  currentUserRole,
  currentUserId,
}: {
  serviceId: string;
  currentUserRole: "LAWIZER_EXPERT" | "USER";
  currentUserId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* ===================== REALTIME LISTENER ===================== */
  useEffect(() => {
    if (!currentUserId) return;

    const q = query(
      collection(db, "serviceChats", serviceId, "messages"),
      orderBy("createdAt", "asc"),
      limit(200),
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });

    return () => unsub();
  }, [serviceId, currentUserId]);

  /* ===================== AUTO SCROLL ===================== */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===================== SEND MESSAGE ===================== */
  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "serviceChats", serviceId, "messages"), {
      senderId: currentUserId,
      senderRole: currentUserRole,
      text,
      createdAt: serverTimestamp(),
      createdAtMs: Date.now(),
      read: false,
    });

    setText("");
  };

  /* -------------------------------------------------------------------------- */
  /*                                  UI                                        */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all bg-white border rounded-xl shadow-xl flex flex-col ${
        open ? "w-[320px] h-[420px]" : "w-[220px] h-[48px]"
      }`}
    >
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className="px-4 py-3 border-b font-medium cursor-pointer flex justify-between items-center"
      >
        <span>Service Chat</span>
        <span className="text-xs text-gray-500">{open ? "—" : "Chat"}</span>
      </div>

      {open && (
        <>
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 text-xs flex flex-col gap-2">
            {messages.map((m) => {
              const isMe = m.senderId === currentUserId;
              return (
                <div
                  key={m.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`inline-block max-w-[80%] px-3 py-2 rounded-2xl break-words whitespace-pre-wrap ${
                      isMe
                        ? "bg-[#c92c41] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="border-t p-2 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Message…"
              className="flex-1 border rounded-md px-2 py-1 text-xs"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-[#c92c41] text-white px-2 rounded-md"
            >
              <Send size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
