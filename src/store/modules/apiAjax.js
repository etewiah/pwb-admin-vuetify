import $ from "jquery";

export default {
  get(url, successCallback, errorCallback) {
    const ls = localStorage;

    $.ajax({
      url,
      type: "GET",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      beforeSend(xhr) {
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("x-csrf-token", localStorage.csrfToken);
      },
      success(data) {
        successCallback(data);
      },
      error(request, status, error) {
        if (errorCallback) {
          const $return = {
            status,
            statusCode: request.status,
            msg: request.responseJSON.Message,
            xhrError: error
          };

          errorCallback($return);
        }
      }
    });
  },

  put(url, postData, successCallback, errorCallback) {
    const ls = localStorage;

    $.ajax({
      url,
      type: "PUT",
      data: postData,
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      beforeSend(xhr) {
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("x-csrf-token", localStorage.authToken);
      },
      success(data) {
        successCallback(data);
      },
      error(request, status, error) {
        if (errorCallback) {
          const $return = {
            status,
            statusCode: request.status,
            msg: request.responseJSON.Message,
            xhrError: error
          };

          errorCallback($return);
        }
      }
    });
  },

  postForm(url, postData, headers, successCallback, errorCallback) {
    $.ajax({
      url,
      type: "POST",
      data: postData,
      headers,
      crossDomain: true,
      dataType: "json",
      success(data) {
        successCallback(data);
      },
      error(request, status, error) {
        if (errorCallback) {
          const $return = {
            status,
            statusCode: request.status,
            msg: request.responseJSON,
            xhrError: error
          };

          errorCallback($return);
        }
      }
    });
  }
};
