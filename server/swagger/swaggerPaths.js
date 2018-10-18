const swaggerPaths = (() => {
  let paths = {};

  return {
    addPath,
    httpStatus,
    showPaths
  };

  /**
   * Builds up the pathname and details into a single object to be given to swagger ui
   * @link https://swagger.io/docs/specification/about/
   * @param {string} pathname The full path name to be added to the documentation
   * @param {Object} pathDetails See the link provided
   * @param {Object} options Add more details to the pathDetails
   */
  function addPath(pathname, pathDetails, options) {
    const pth = {};
    let pDet = pathDetails;
    if (options && options.protected) {
      pDet = protectPath(pDet);
    }
    pth[pathname] = pDet;
    mergePath(pth);
  }

  function httpStatus(status, description) {
    const statuses = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Not Authorized',
      404: 'Not Found'
    };
    return `(${statuses[status]}) ${description}`;
  }

  function showPaths() {
    return paths;
  }

  // =================================

  function mergePath(newpath) {
    paths = Object.assign({}, paths, newpath);
  }

  function protectPath(pathDetails) {
    const reqTypes = Object.keys(pathDetails);
    const pDet = Object.assign({}, pathDetails);
    reqTypes.forEach((reqType) => {
      if (!pDet[reqType].parameters) {
        pDet[reqType].parameters = [];
      }
      if (!pDet[reqType].responses) {
        pDet[reqType].responses = {};
      }
      if (!pDet[reqType].security) {
        pDet[reqType].security = {};
      }
      pDet[reqType].security.token = [];
      pDet[reqType].parameters.push({
        name: 'token',
        in: 'header',
        type: 'string',
        required: true,
        description: 'Identifies the user making the request',
        example: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.hzfEQOcJdvat6x_di6IDwi_tykCfKIAeehBukstyS14'
      });
      pDet[reqType].responses['401'] = {
        description: httpStatus(401, 'Invalid token or no token supplied')
      };
    });
    return pDet;
  }
})();

module.exports = swaggerPaths;
