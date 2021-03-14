import React, { useMemo } from 'react';
// Route
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Component
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
// Style
import { makeStyles } from '@material-ui/core/styles';

export interface ITabs {
  title: string;
  tabName?: string;
  component: JSX.Element;
  url?: string;
}

interface IProps {
  tabs: ITabs[];
}

const LinkTab = (props: any) => <Tab {...props} component={Link} />;

const CustomTabs: React.FC<IProps> = (props) => {
  const { tabs } = props;
  const match = useRouteMatch<{ tab: string }>();
  const classes = useStyles();

  const tabValue = useMemo(() => {
    return tabs
      .map((tab, index) => tab.tabName)
      .findIndex((tabName) => tabName === match.params.tab);
  }, [tabs, match]);

  const tabsContent = useMemo(() => {
    return tabs.map((tab, index) => {
      if (match.params.tab !== tab.tabName) {
        return null;
      }
      return (
        <div key={index} className={classes.content}>
          {tab.component}
        </div>
      );
    });
  }, [tabs, match]);

  return (
    <>
      <Tabs
        value={tabValue > 0 ? tabValue : 0}
        classes={{
          root: classes.tabsRoot,
          indicator: classes.tabsIndicator,
        }}
      >
        {tabs.map((tab, index) => (
          <LinkTab
            to={tab.url || '#'}
            key={index}
            label={tab.title}
            disableRipple
            classes={{
              root: classes.tabRoot,
              selected: classes.tabSelected,
            }}
          />
        ))}
      </Tabs>
      <div className={classes.tabBarBottom} />
      {tabsContent}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  tabRoot: {
    textTransform: 'initial',
    fontSize: 15,
    minWidth: 100,
  },
  tabsRoot: {},
  tabsIndicator: {
    backgroundColor: '#2086D9',
    height: 3,
    zIndex: 3,
  },
  tabSelected: {},
  tabBarBottom: {
    width: '100%',
    height: 3,
    minHeight: 3,
    backgroundColor: 'rgba(153, 170, 185, 0.38)',
    transform: 'translateY(-3px)',
  },
  content: {},
}));

export default CustomTabs;
