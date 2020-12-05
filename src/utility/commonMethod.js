export const showToast = (_this, code, title, description) => {
  let varient = 'success';
  if (code == 200) {
    varient = 'primary';
  } else if (code == 300) {
    varient = 'warning';
  } else {
    varient = 'danger';
  }
  _this.$bvToast.toast(description, {
    title: title,
    variant: varient,
    solid: true
  });
};
export const formInvalidityToast = (_this, keyObject, dataObject) => {
  console.log(dataObject);
  for (var key in keyObject) {
    if (dataObject[key].$invalid) {
      for (var obj in dataObject[key]) {
        switch (obj) {
          case 'required':
            if (!dataObject[key][obj]) {
              showToast(_this, 400, obj, `${key} is required`);
            }
            break;
          case 'email':
            if (!dataObject[key][obj]) {
              showToast(_this, 400, obj, `${key} is not valid`);
            }
            break;
          default:
            break;
        }
      }
    }
  }
};
