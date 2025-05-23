export const checkOverlap = (newStart, newEnd, existingStart, existingEnd) => {
  if (newStart >= existingStart && newStart <= existingEnd) return true;
  if (newEnd >= existingStart && newEnd <= existingEnd) return true;
  if (newStart <= existingStart && newEnd >= existingEnd) return true;

  return false;
};

export const formatDate = (timestamp = Date.now()) => {
  const tanggal = new Date(timestamp);
  const hari = tanggal.toLocaleDateString('id-ID', { weekday: 'long' });
  const tanggalAngka = tanggal.getDate();
  const bulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
  const tahun = tanggal.getFullYear();

  return `${hari}, ${tanggalAngka} ${bulan} ${tahun}`;
};

export const formatName = (name) => {
  if (Array.isArray(name)) {
    return name.map(formatName)
  }
  if (typeof name !== "string" || name.length === 0) return name
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export const formatTempat = (tempat) => {
  if (typeof tempat !== "string" || tempat.length === 0) return tempat
  return tempat.toUpperCase()
}