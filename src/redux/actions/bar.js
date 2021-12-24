// export function showCreate() {
//   return { type: "SHOW_CREATE" };
// }

// export function closeCreate() {
//   return { type: "CLOSE_CREATE" };
// }

// export function showSidebar() {
//   return { type: "SHOW_SIDEBAR" };
// }

// export function closeSidebar() {
//   return { type: "CLOSE_SIDEBAR" };
// }

export function toggleCreate(payload) {
  return { type: "TOGGLE_CREATE", payload };
}

export function toggleSidebar(payload) {
  return { type: "TOGGLE_SIDEBAR", payload };
}

export function setToday(payload) {
  return { type: "SET_TODAY", payload };
}
