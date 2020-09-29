var session = (function() {
    var full_name = "";
  
    var getSession = function(key) {
      return  isJsonString(sessionStorage.getItem(key)) ? (sessionStorage.getItem(key)!==null ? JSON.parse(sessionStorage.getItem(key)) : {}) : {};//sessionStorage.getItem(key);;    // Or pull this from cookie/localStorage
    };
  
    var setSession = function(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    };

    function isJsonString(str) {
      try {
        JSON.parse(str);
        //console.log("isJsonString->try", str)
      } catch (e) {
        //console.log("isJsonString->catch", str)
        return false;
      }
      return true;
    }
    return {
        getSession: getSession,
        setSession: setSession
    }
  
  })();
  
  export default session;