import { ref, set, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../firebaseClient";

export function setTyping(
  bookingId: string,
  role: "expert" | "client",
  value: boolean
) {
  return set(ref(rtdb, `chatRooms/${bookingId}/typing/${role}`), value);
}

export function useTypingStatus(bookingId: string, role: "expert" | "client") {
  const [typing, setTypingState] = useState(false);
  const other = role === "expert" ? "client" : "expert";

  useEffect(() => {
    const refTyping = ref(rtdb, `chatRooms/${bookingId}/typing/${other}`);
    const unsub = onValue(refTyping, (snap) => {
      setTypingState(!!snap.val());
    });
    return () => unsub();
  }, [bookingId, role]);

  return typing;
}
