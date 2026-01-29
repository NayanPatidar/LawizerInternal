import { ref, push } from "firebase/database";
import { rtdb } from "../firebaseClient";

export function sendMessage({
  bookingId,
  text,
  senderId,
  senderRole,
}: {
  bookingId: string;
  text: string;
  senderId: string;
  senderRole: "expert" | "client";
}) {
  const messagesRef = ref(rtdb, `chatRooms/${bookingId}/messages`);

  return push(messagesRef, {
    text,
    senderId,
    senderRole,
    timestamp: Date.now(),
  });
}
