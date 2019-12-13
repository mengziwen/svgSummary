export function GenNonDuplicateID(randomLength: number = 32) :string {
  return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}