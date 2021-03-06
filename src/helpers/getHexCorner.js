export default function getHexCorner(size, direction) {
  const angleDeg = 60 * direction - 30;
  const angleRad = (Math.PI / 180) * angleDeg;
  return `${size * Math.cos(angleRad)},${size * Math.sin(angleRad)}`;
}