function safeVMID(vmid) {
  return ("" + vmid).replaceAll(/[ :.]/g, '-').trim();
}

module.exports = safeVMID;