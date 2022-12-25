export default function formatNumber(num: number) {
    let formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(num);
  }