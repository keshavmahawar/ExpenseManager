import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
class PrivateRouting extends React.Component {
    render() {
        let { children, isLogin, ...others } = this.props;
        return (
            <Route
                {...others}
                render={({ location }) =>
                    !isLogin ? (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    ) : (
                        children
                    )
                }
            />
        );
    }
}

const mapStatesToProps = (state) => ({
    isLogin: state.user.isLogin,
});

export default connect(mapStatesToProps)(PrivateRouting);
