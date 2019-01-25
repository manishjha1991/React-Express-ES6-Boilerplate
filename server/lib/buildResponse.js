export function success(result) {
  return {
    status: {
      code: 200,
      message: "Success"
    },

    result
  };
}

export function failure(error) {
  /*eslint-disable */
  console.error(error);
  /*eslint-enable */
  //logger.log("error", error);
  return {
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      message: "Something is wrong",
      error: error.message
    })
  };
}
