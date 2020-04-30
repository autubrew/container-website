const req = require.context('./modules', false, /\.js$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);