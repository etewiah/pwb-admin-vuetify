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
        console.error("====================================");
        console.error("===> ERROR calling API " + err.request.responseURL);
        console.error("===> MESSAGE: " + err.message);
        console.error("====================================");
        return err;
      }
    );
  },

  // https://pwb-jan-2018.herokuapp.com/en/users/sign_in?theme=default
  GetWebsiteSettings(successCallback, errorCallback) {
    if (localStorage.WebSiteData.length > 10) {
      return JSON.parse(localStorage.WebSiteData); // RETURN PREVIOUSLY LOADED SETTINSS
    } else {
      localStorage.SiteData = undefined; // DATA NOT LOADED IN LOCAL STORAGE: GET() DATA
      localStorage.WebSiteData = undefined;
      // this.Get(
      //   "/api/v2/agency",
      //   data => {
      //     localStorage.SiteData = JSON.stringify(data);
      //     data.website.hasChanges = false;
      //     localStorage.WebSiteData = JSON.stringify(data.website); // !!remember to use JSON.parse() to read the values back
      //     resolve(data.website);
      //     console.log("SETTINGS LOAD SUCCESS: " + data.website);
      //   },
      //   err => {
      //     err = null;
      //     reject(err.message);
      //   }
      // );

      axios.get("/api/v2/agency").then(
        response => {
          let token = response.headers["x-csrf-token"];
          axios.defaults.headers.common["X-CSRF-Token"] = token;
          localStorage.SiteData = JSON.stringify(response.data);
          response.data.website.hasChanges = false;
          localStorage.WebSiteData = JSON.stringify(response.data.website); // !!remember to use JSON.parse() to read the values back
          console.log("SETTINGS LOAD SUCCESS: " + response.data.website);
          successCallback(response.data);
        },
        err => {
          console.error("====================================");
          console.error("===> ERROR calling API " + err.request.responseURL);
          console.error("===> MESSAGE: " + err.message);
          console.error("====================================");
          return err;
        }
      );
    }
  }
};

// export { Get, GetWebsiteSettings };
