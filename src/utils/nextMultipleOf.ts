function nextMultipleOf(num: number, multiple: number): number {
  const remainder = num % multiple
  return remainder > 0 ? num + (multiple - remainder) : num
}

export default nextMultipleOf
