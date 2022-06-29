import ImageKit from "imagekit-javascript";

export function imageKitURL(
  url,
  options?: { width?: string; height?: string }
) {
  const urlInstance = new URL(url);

  return new ImageKit({
    publicKey: "public_AHpgKbpn6xcLMFAgBojOgrmhGlc=",
    urlEndpoint: "https://ik.imagekit.io/bemovin",
  }).url({
    path: urlInstance.pathname.split("/").slice(2).join("/"),
    transformation: [
      {
        height: "250",
        width: "250",
        focus: "top",
        ...(options || {}),
      },
    ],
  });
}
