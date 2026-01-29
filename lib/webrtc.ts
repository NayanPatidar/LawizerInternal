export const iceServers: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  {
    urls: "turn:relay1.expressturn.com:3480",
    username: "000000002082800792",
    credential: "JPGMR7t+o9ieAB4KFh6t4bhtta8=",
  },
];

export function createPeerConnection(
  onTrack: (stream: MediaStream) => void,
  onIceCandidate: (candidate: RTCIceCandidate) => void
) {
  const pc = new RTCPeerConnection({ iceServers });

  pc.ontrack = (event) => {
    console.log("WebRTC: Remote track received");
    onTrack(event.streams[0]);
  };

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate(event.candidate);
    }
  };

  // Connection State Logging
  pc.oniceconnectionstatechange = () =>
    console.log("ICE:", pc.iceConnectionState);
  pc.onconnectionstatechange = () => console.log("PC:", pc.connectionState);

  return pc;
}
