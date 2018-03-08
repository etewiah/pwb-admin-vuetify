import axios from "axios";

export default {
  Get(apiRoute, successCallback, errorCallback) {
    console.log("Axios Debug GET: " + apiRoute);
    axios.get(apiRoute).then(
      response => {
        let token = response.headers["x-csrf-token"];
        axios.defaults.headers.common["X-CSRF-Token"] = token;
        // console.log('AxiosApi.Get() RESPONSE DATA: -------------------------------------------------------')
        // console.log(response)
        successCallback(response.data);
      },
      err => {
        console.log(err);
        errorCallback(err);
      }
    );
  },

  GetWebsiteSettings(successCallback, errorCallback) {
    // CHECK IF LOCALSTORAGE IS ALREADY LOADED
    if (localStorage.WebSiteData.length > 10) {
      successCallback(JSON.parse(localStorage.WebSiteData)); // RETURN PREVIOUSLY LOADED SETTINSS
    } else {
      localStorage.SiteData = undefined; // DATA NOT LOADED IN LOCAL STORAGE: GET() DATA
      localStorage.WebSiteData = undefined;

      this.Get(
        "api/v2/agency",
        data => {
          localStorage.SiteData = JSON.stringify(data);
          localStorage.WebSiteData = JSON.stringify(data.website); // !!remember to use JSON.parse() to read the values back
          this.WebsiteSettings = data.website;
          console.log("SETTINGS LOAD SUCCESS: " + data.website);
        },
        err => {
          localStorage.SiteData = "[]";
          localStorage.WebSiteData = "[]";
          console.log(err);
          errorCallback(err);
        }
      );
    }
  }
};

// export { Get, GetWebsiteSettings };
