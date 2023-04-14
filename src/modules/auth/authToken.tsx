let inMemoryToken = null;

export class AuthToken {
  static get() {
    if(inMemoryToken) {
      return inMemoryToken;
    }
    if(!inMemoryToken){
      if(typeof window != 'undefined'){
        return localStorage.getItem('jwt');
      }
      return null;
    }
    return null;
  }

  static set(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('jwt', token || '');
    } else {
      inMemoryToken = token;
      localStorage.setItem('jwt', '');
    }
  }

  static applyFromLocationUrlIfExists() {
    const urlParams = new URLSearchParams(
      window.location.search,
    );
    const authToken = urlParams.get('authToken');

    if (!authToken) {
      return;
    }

    this.set(authToken, true);
    window.history.replaceState(
      {},
      document.title,
      window.location.origin,
    );
  }
}
