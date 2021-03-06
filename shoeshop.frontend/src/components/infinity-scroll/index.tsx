import * as React from 'react';

interface Props {
  enablePaging?: boolean;
  threshold?: number;
  isLoading?: boolean;
  loadingRenderer?: any;
  hasMore?: boolean;
  loadMore?: () => void;
}

interface State {}

interface DefaultProps {
  threshold: number;
  isLoading: boolean;
  enablePaging: boolean;
  hasMore: boolean;
}

class InfinityScroll extends React.Component<Props, State> {
  private scrollComponent: any;

  static defaultProps: DefaultProps = {
    threshold: 200,
    isLoading: false,
    enablePaging: true,
    hasMore: false,
  };

  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  attachScrollListener = () => {
    if (window != undefined && this.scrollComponent != undefined) {
      // this.scrollListener();
      window.addEventListener('scroll', this.scrollListener, false);
      window.addEventListener('resize', this.scrollListener, false);
    }
  };

  detachScrollListener = () => {
    if (window != undefined && this.scrollComponent != undefined) {
      window.removeEventListener('scroll', this.scrollListener, false);
      window.removeEventListener('resize', this.scrollListener, false);
    }
  };

  scrollListener = () => {
    if (this.props.enablePaging && this.getInfiniteScrollCondition() && this.props.loadMore) {
      this.props.loadMore();
    }
  };

  getInfiniteScrollCondition = () => {
    const { threshold } = this.props;
    const el = this.scrollComponent;
    const scrollTop = window.pageYOffset;
    const offset =
      this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);

    return (
      offset < Number(threshold) &&
      el.offsetParent !== null &&
      this.props.hasMore &&
      !this.props.isLoading
    );
  };

  calculateTopPosition(el: any): any {
    return el ? el.offsetTop + this.calculateTopPosition(el.offsetParent) : 0;
  }

  render() {
    return (
      <div ref={(c) => (this.scrollComponent = c)}>
        {this.props.children}
        {this.props.enablePaging && this.props.isLoading && this.props.loadingRenderer}
      </div>
    );
  }
}

export default InfinityScroll;
