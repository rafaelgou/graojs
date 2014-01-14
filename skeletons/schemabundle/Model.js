var {{ schema | capitalize }} = function(di) {
  di.schemas.{{ schema | lower }}.mongoose.methods = {
  };

  return di.mongoose.model("{{ schema | capitalize }}", di.schemas.{{ schema | lower }}.mongoose);
};

module.exports = exports = {{ schema | capitalize }};