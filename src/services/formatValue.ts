export default function formatValue(value: string) {
  let result = value.trim();

  if (!result) {
    return "";
  }

  result = value
      .split(" ")
      .filter(word => word)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return result;  
}

console.log(formatValue('new   york'));