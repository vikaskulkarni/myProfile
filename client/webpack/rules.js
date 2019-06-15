const { join } = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rules = [
  {
    test: /.jsx?$/,
    loader: "babel-loader",
    exclude: /node_modules/
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "sass-loader"
      }
    ]
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "sass-loader"
      }
    ]
  },
  {
    test: /\.(woff2|woff|ttf|eot|svg)(\?.*$|$)/,
    loader: "file-loader?name=fonts/[name].[ext]",
    include: [join(__dirname, "src"), join(__dirname, "node_modules")]
  },
  // {
  //   test: /\.(jpg|jpeg|gif|png|ico)(\?.*$|$)$/,
  //   loader: 'file-loader?name=img/[name].[ext]',
  //   include: [join(__dirname, 'src'), join(__dirname, 'node_modules')]
  // }
  {
    test: /\.(ico)$/i,
    loader: "file-loader?name=[name].[ext]"
  },
  {
    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
    loader: "url-loader?limit=100000"
  }
];
module.exports = rules;
