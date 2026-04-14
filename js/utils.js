// Fonction pour obtenir l'ID de la vidéo YouTube
export function getYouTubeID(url) {
  // https://youtu.be/KOutPbKc9UM?si=cwpdMl2BpZz0L01h
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
  const matches = url.match(regex);
  return matches ? matches[1] : null;
}
