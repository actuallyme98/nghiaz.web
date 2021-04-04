import React from 'react';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Layout from '../../components/layout';

// redux
import * as AppActions from '@actions/app-action';
import { initializeStore } from '@redux/with-redux';

// enums
import { AppRouteEnums } from '../../enums/app-route.enum';

interface Props {}

const Blogs: React.FC<Props> = (props) => {
  return (
    <Layout backUrl={AppRouteEnums.HOME} title="Bài viết">
      <div className={clsx(css.container)}>
        <div className={css.contentLeft}>
          <div className={css.block}>
            <div className={css.meta}>
              <div className={css.date}>
                <img src="/assets/mocks/blogs/calendar.svg" alt="" />
                <span>March 22nd,2021</span>
              </div>
              <div className={css.comment}>
                <img src="/assets/mocks/blogs/comment.svg" alt="" />
                <span>Comments</span>
              </div>
            </div>

            <h1>
              <a className={css.title} href="#">
                Data Structures in Python: Stacks, Queues, Linked Lists, & Trees
              </a>
            </h1>
            <p className={css.para}>
              Do you want to learn more about Computer Science fundamentals? Do you want to gain
              deeper knowledge to help you pass your interviews? Then it’s vital that you study data
              structures. I always say that Python is the perfect first language to learn: it has a
              straightforward, English-like syntax that makes reading it a […]
            </p>

            <h3 className={css.share}>Share this:</h3>
            <div className={css.media}>
              <a href="#">
                <img src="/assets/mocks/blogs/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/reddit.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/email.svg" alt="" />
              </a>
            </div>

            <span>
              Tags:
              <a className={css.tags} href="#">
                data structure
              </a>
              ,
              <a className={css.tags} href="#">
                linked list
              </a>
              ,
              <a className={css.tags} href="#">
                python
              </a>
              ,
              <a className={css.tags} href="#">
                queue
              </a>
              ,
              <a className={css.tags} href="#">
                stack
              </a>
              ,
              <a className={css.tags} href="#">
                tree
              </a>
            </span>
          </div>

          <div className={css.block}>
            <div className={css.meta}>
              <div className={css.date}>
                <img src="/assets/mocks/blogs/calendar.svg" alt="" />
                <span>March 22nd,2021</span>
              </div>
              <div className={css.comment}>
                <img src="/assets/mocks/blogs/comment.svg" alt="" />
                <span>Comments</span>
              </div>
            </div>

            <h1>
              <a className={css.title} href="#">
                Data Structures in Python: Stacks, Queues, Linked Lists, & Trees
              </a>
            </h1>
            <p className={css.para}>
              Do you want to learn more about Computer Science fundamentals? Do you want to gain
              deeper knowledge to help you pass your interviews? Then it’s vital that you study data
              structures. I always say that Python is the perfect first language to learn: it has a
              straightforward, English-like syntax that makes reading it a […]
            </p>

            <h3 className={css.share}>Share this:</h3>
            <div className={css.media}>
              <a href="#">
                <img src="/assets/mocks/blogs/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/reddit.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/email.svg" alt="" />
              </a>
            </div>

            <span>
              Tags:
              <a className={css.tags} href="#">
                data structure
              </a>
              ,
              <a className={css.tags} href="#">
                linked list
              </a>
              ,
              <a className={css.tags} href="#">
                python
              </a>
              ,
              <a className={css.tags} href="#">
                queue
              </a>
              ,
              <a className={css.tags} href="#">
                stack
              </a>
              ,
              <a className={css.tags} href="#">
                tree
              </a>
            </span>
          </div>

          <div className={css.block}>
            <div className={css.meta}>
              <div className={css.date}>
                <img src="/assets/mocks/blogs/calendar.svg" alt="" />
                <span>March 22nd,2021</span>
              </div>
              <div className={css.comment}>
                <img src="/assets/mocks/blogs/comment.svg" alt="" />
                <span>Comments</span>
              </div>
            </div>

            <h1>
              <a className={css.title} href="#">
                Data Structures in Python: Stacks, Queues, Linked Lists, & Trees
              </a>
            </h1>
            <p className={css.para}>
              Do you want to learn more about Computer Science fundamentals? Do you want to gain
              deeper knowledge to help you pass your interviews? Then it’s vital that you study data
              structures. I always say that Python is the perfect first language to learn: it has a
              straightforward, English-like syntax that makes reading it a […]
            </p>

            <h3 className={css.share}>Share this:</h3>
            <div className={css.media}>
              <a href="#">
                <img src="/assets/mocks/blogs/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/reddit.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/email.svg" alt="" />
              </a>
            </div>

            <span>
              Tags:
              <a className={css.tags} href="#">
                data structure
              </a>
              ,
              <a className={css.tags} href="#">
                linked list
              </a>
              ,
              <a className={css.tags} href="#">
                python
              </a>
              ,
              <a className={css.tags} href="#">
                queue
              </a>
              ,
              <a className={css.tags} href="#">
                stack
              </a>
              ,
              <a className={css.tags} href="#">
                tree
              </a>
            </span>
          </div>

          <div className={css.block}>
            <div className={css.meta}>
              <div className={css.date}>
                <img src="/assets/mocks/blogs/calendar.svg" alt="" />
                <span>March 22nd,2021</span>
              </div>
              <div className={css.comment}>
                <img src="/assets/mocks/blogs/comment.svg" alt="" />
                <span>Comments</span>
              </div>
            </div>

            <h1>
              <a className={css.title} href="#">
                Data Structures in Python: Stacks, Queues, Linked Lists, & Trees
              </a>
            </h1>
            <p className={css.para}>
              Do you want to learn more about Computer Science fundamentals? Do you want to gain
              deeper knowledge to help you pass your interviews? Then it’s vital that you study data
              structures. I always say that Python is the perfect first language to learn: it has a
              straightforward, English-like syntax that makes reading it a […]
            </p>

            <h3 className={css.share}>Share this:</h3>
            <div className={css.media}>
              <a href="#">
                <img src="/assets/mocks/blogs/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/reddit.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/email.svg" alt="" />
              </a>
            </div>

            <span>
              Tags:
              <a className={css.tags} href="#">
                data structure
              </a>
              ,
              <a className={css.tags} href="#">
                linked list
              </a>
              ,
              <a className={css.tags} href="#">
                python
              </a>
              ,
              <a className={css.tags} href="#">
                queue
              </a>
              ,
              <a className={css.tags} href="#">
                stack
              </a>
              ,
              <a className={css.tags} href="#">
                tree
              </a>
            </span>
          </div>

          <div className={css.block}>
            <div className={css.meta}>
              <div className={css.date}>
                <img src="/assets/mocks/blogs/calendar.svg" alt="" />
                <span>March 22nd,2021</span>
              </div>
              <div className={css.comment}>
                <img src="/assets/mocks/blogs/comment.svg" alt="" />
                <span>Comments</span>
              </div>
            </div>

            <h1>
              <a className={css.title} href="#">
                Data Structures in Python: Stacks, Queues, Linked Lists, & Trees
              </a>
            </h1>
            <p className={css.para}>
              Do you want to learn more about Computer Science fundamentals? Do you want to gain
              deeper knowledge to help you pass your interviews? Then it’s vital that you study data
              structures. I always say that Python is the perfect first language to learn: it has a
              straightforward, English-like syntax that makes reading it a […]
            </p>

            <h3 className={css.share}>Share this:</h3>
            <div className={css.media}>
              <a href="#">
                <img src="/assets/mocks/blogs/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/reddit.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/email.svg" alt="" />
              </a>
            </div>

            <span>
              Tags:
              <a className={css.tags} href="#">
                data structure
              </a>
              ,
              <a className={css.tags} href="#">
                linked list
              </a>
              ,
              <a className={css.tags} href="#">
                python
              </a>
              ,
              <a className={css.tags} href="#">
                queue
              </a>
              ,
              <a className={css.tags} href="#">
                stack
              </a>
              ,
              <a className={css.tags} href="#">
                tree
              </a>
            </span>
          </div>

          <div className={css.block}>
            <div className={css.meta}>
              <div className={css.date}>
                <img src="/assets/mocks/blogs/calendar.svg" alt="" />
                <span>March 22nd,2021</span>
              </div>
              <div className={css.comment}>
                <img src="/assets/mocks/blogs/comment.svg" alt="" />
                <span>Comments</span>
              </div>
            </div>

            <h1>
              <a className={css.title} href="#">
                Data Structures in Python: Stacks, Queues, Linked Lists, & Trees
              </a>
            </h1>
            <p className={css.para}>
              Do you want to learn more about Computer Science fundamentals? Do you want to gain
              deeper knowledge to help you pass your interviews? Then it’s vital that you study data
              structures. I always say that Python is the perfect first language to learn: it has a
              straightforward, English-like syntax that makes reading it a […]
            </p>

            <h3 className={css.share}>Share this:</h3>
            <div className={css.media}>
              <a href="#">
                <img src="/assets/mocks/blogs/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/reddit.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/email.svg" alt="" />
              </a>
            </div>

            <span>
              Tags:
              <a className={css.tags} href="#">
                data structure
              </a>
              ,
              <a className={css.tags} href="#">
                linked list
              </a>
              ,
              <a className={css.tags} href="#">
                python
              </a>
              ,
              <a className={css.tags} href="#">
                queue
              </a>
              ,
              <a className={css.tags} href="#">
                stack
              </a>
              ,
              <a className={css.tags} href="#">
                tree
              </a>
            </span>
          </div>

          <div className={css.block}>
            <div className={css.meta}>
              <div className={css.date}>
                <img src="/assets/mocks/blogs/calendar.svg" alt="" />
                <span>March 22nd,2021</span>
              </div>
              <div className={css.comment}>
                <img src="/assets/mocks/blogs/comment.svg" alt="" />
                <span>Comments</span>
              </div>
            </div>

            <h1>
              <a className={css.title} href="#">
                Data Structures in Python: Stacks, Queues, Linked Lists, & Trees
              </a>
            </h1>
            <p className={css.para}>
              Do you want to learn more about Computer Science fundamentals? Do you want to gain
              deeper knowledge to help you pass your interviews? Then it’s vital that you study data
              structures. I always say that Python is the perfect first language to learn: it has a
              straightforward, English-like syntax that makes reading it a […]
            </p>

            <h3 className={css.share}>Share this:</h3>
            <div className={css.media}>
              <a href="#">
                <img src="/assets/mocks/blogs/twitter.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/reddit.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/facebook.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
              </a>
              <a href="#">
                <img src="/assets/mocks/blogs/email.svg" alt="" />
              </a>
            </div>

            <span>
              Tags:
              <a className={css.tags} href="#">
                data structure
              </a>
              ,
              <a className={css.tags} href="#">
                linked list
              </a>
              ,
              <a className={css.tags} href="#">
                python
              </a>
              ,
              <a className={css.tags} href="#">
                queue
              </a>
              ,
              <a className={css.tags} href="#">
                stack
              </a>
              ,
              <a className={css.tags} href="#">
                tree
              </a>
            </span>
          </div>
        </div>

        <div className={css.contentRight}>
          <div className={css.header}>Connect with Me</div>
          <div className={css.media}>
            <a href="#">
              <img src="/assets/mocks/blogs/youtube.svg" alt="" />
            </a>
            <a href="#">
              <img src="/assets/mocks/blogs/twitter.svg" alt="" />
            </a>
            <a href="#">
              <img src="/assets/mocks/blogs/facebook.svg" alt="" />
            </a>
            <a href="#">
              <img src="/assets/mocks/blogs/linkedin.svg" alt="" />
            </a>
          </div>

          <div>
            <div className={css.header1}>Categories</div>
            <ul>
              <li>
                <a className={css.item} href="#">
                  Angular
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  ASP.NET
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  Backend
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  GraphQL
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  C# / .NET
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  Computer Science
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  Course
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  CSS
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Data Structures
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Django
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Flutter
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  General
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Interviews
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Java
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Java Script
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  Mobile
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Python
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  React
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  React Native
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Redux
                </a>
              </li>

              <li>
                <a className={css.item} href="#">
                  Svetle
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className={css.header1}>Popular Posts</div>
            <ul>
              <li>
                <a className={css.item} href="#">
                  53 Python Exercises and Questions for Beginners
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  React vs. Angular: The Complete Comparison
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  React file upload: proper and easy way, with NodeJS!
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  React Lifecycle Methods – A Deep Dive
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  How to use localStorage with React
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  4 Common Mistakes with the Repository Pattern
                </a>
              </li>
              <li>
                <a className={css.item} href="#">
                  React Functional or Class Components: Everything you need to know
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  dispatch(AppActions.detectMobile(userAgent));

  return {
    props: {
      initialReduxState: reduxStore.getState(),
    },
  };
};

export default Blogs;
