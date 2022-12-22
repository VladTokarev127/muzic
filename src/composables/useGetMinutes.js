export const useConvertSecondsToMinutes = (totalSeconds) => {
  // 👇️ get number of full minutes
  const minutes = Math.floor(totalSeconds / 60);

  // 👇️ get remainder of seconds
  const seconds = totalSeconds % 60;

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};
