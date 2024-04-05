function nearestMultipleOf(value: number, multiple: number) {
  return Math.round(value / multiple) * multiple
}

export default nearestMultipleOf
