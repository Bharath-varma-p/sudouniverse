exports.decorateTerms = (Terms, { React, notify }) => {
    return class extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.terms = null;
        this.onDecorated = this.onDecorated.bind(this);
      }
  
      onDecorated(terms) {
        this.terms = terms;
        this.forceUpdate();
      }
  
      render() {
        return React.createElement(
          Terms,
          Object.assign({}, this.props, {
            onDecorated: this.onDecorated,
          })
        );
      }
    };
  };