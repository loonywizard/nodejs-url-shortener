function isValidUrl(url: string): boolean {
  try {
    const urlObject = new URL(url)

    return urlObject.protocol === 'http:' || urlObject.protocol === 'https:'
  } catch (error) {
    return false
  }
}

export { isValidUrl }
