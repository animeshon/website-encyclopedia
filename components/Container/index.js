import React, { Component } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

import HeroCover from '@/components/HeroCover';
import ProductCover from '@/components/ProductCover';
import TabNavigation from '@/components/TabNavigation';
import EntityTitle from '@/components/EntityTitle';
import Header from '@/components/Header';

import { ExecuteQuery } from '@/utilities/Query';

import ContainerQuery from '@/queries/container/Container';
import Navigation from '@/resources/navigation/allTabNavigations';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';


const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
};

const Container = ({ container, children }) => {
    const { route } = useRouter();
    const selectedLabel = container.navigation.filter(i => route === i.href)[0].label

    return (
        <div className="any">
            <Header isSearchAvailable />
            <HeroCover
                entityTitle={container.title}
                altText={container.title}
                profileImage={container.profileImage}
                breadcrumb={[container.type, container.title, selectedLabel]}
            />
            <TabNavigation items={container.navigation} selected={container.selected} />
            <div className="any-landing container">
                <div className="any-landing__cover">
                    <ProductCover
                        altText={container.title}
                        bannerImage={container.bannerImage}
                    />
                </div>
                <div className="product-page-offset">
                    <Mobile>
                        <EntityTitle title={container.title} />
                    </Mobile>
                    {children}
                </div>
            </div>
        </div>
    );
};

// HOC best practice https://it.reactjs.org/docs/higher-order-components.html
export function withContainer(WrappedComponent) {
    class witContainer extends Component {
        constructor(props) {
            super(props)
        }

        //static getInitialProps = WrappedComponent.getInitialProps

        static async getInitialProps(ctx) {
            const type = ctx.pathname.split('/')[1]
            const { id } = ctx.query;
            const data = await ExecuteQuery(ctx, {id:id}, ContainerQuery(type), (data, error) => { return data.result; });

            // Get component’s props
            let componentProps = {}
            if (WrappedComponent.getInitialProps) {
                componentProps = await WrappedComponent.getInitialProps(ctx);
            }

            return {
                container: {
                    id: data.id,
                    type: data.__typename,
                    title: locale.EnglishAny(data.names),
                    bannerImage: image.ProfileAny(data.images),
                    profileImage: image.Cover(data.images),
                    navigation: Navigation(type, data.id)
                },
                ...componentProps
            };
        }

        render() {
            const { container, ...passThroughProps } = this.props;
            return (
                <Container container={container}>
                    <WrappedComponent {...passThroughProps} />
                </Container>
            )
        }
    }

    witContainer.staticMethod = WrappedComponent.staticMethod;
    return witContainer;
}

export default withContainer;
