import React ,{Component} from 'react';
import { render } from 'react-dom';
import {urlB64ToUint8Array,payloadFromSubscription} from '../helpers/Utility'
import PropTypes from 'prop-types'
const applicationServerPublicKey = "BADRpdFs_1FjzOZvs0ib7sVKzl9lT8BGUoj3X9-TKQvj0n_ougrIkbMe-yWtbDfhjANBJoseNBRjSk3grHoZ840"

class WebPush extends Component{


    constructor(props){
    super(props);


    //this.updateSubscription=this.updateSubscription.bind(this);
    this.subscribeForNotifications=this.subscribeForNotifications.bind(this);
    }

    componentWillMount(){
      //alert('Inside WebPush');
    }



    componentWillReceiveProps(nextProps){
      console.log('Is User subscribed'+ this.props.isUserSubscribed+' , '+nextProps.isUserSubscribed);
      if(nextProps.isUserSubscribed != this.props.isUserSubscribed && nextProps.isUserSubscribed){
        console.log('user is subscribed');
        //subscribeForNotifications();
        this.subscribeForNotifications();
      }else if(nextProps.isUserSubscribed != this.props.isUserSubscribed && !nextProps.isUserSubscribed) {
        console.log('Removing the user from the subscription');
        this.unregister();
      }
    }


    subscribeForNotifications(){
        var serviceWorker=navigator.serviceWorker;
        var updateSubscription=this.props.updateSubscription;
        console.log('updateSubscription '+updateSubscription);
        //var registration=serviceWorker.getSubcription`  ``````                          1111QQQQQQQQ
        //alert('subscribe button clicked'+ serviceWorker.getSubcription);
        navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
          // Use the PushManager to get the user's subscription to the push service.
          //alert(registration.pushManager.getSubscription());

          return registration.pushManager.getSubscription()
          .then(function(subscription) {
            // If a subscription was found, return it.
             if (subscription) {
                console.log('subscription exists'+subscription.endpoint);
               //return subscription;
              // return subscription.endpoint;
             }
             else {
               console.log('registering push manager'+registration.pushManager.subscribe({ userVisibleOnly: true }));
               const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)
               var subscription=registration.pushManager.subscribe({ userVisibleOnly: true ,applicationServerKey:applicationServerKey });
              console.log('New subscription'+subscription.endpoint);
              // return(subscription.endpoint);
             }
             updateSubscription(subscription);

          }).then(function(subscription){
                    // Retrieve the user's public key.
                    var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
                    key = rawKey ?
                      btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
                      '';
                    var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
                    authSecret = rawAuthSecret ?
                             btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) :
                             '';

                    endpoint = subscription.endpoint;

                    // Send the subscription details to the server using the Fetch API.
                    fetch('./register', {
                    method: 'post',
                    headers: {
                    'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                    endpoint: subscription.endpoint,
                    key: key,
                    authSecret: authSecret,
                    }),
                    });

            });
        });

    }


    unregister(){
      console.log('Trying to unregister the service worker');
      if('serviceWorker' in navigator){
        navigator.serviceWorker.ready.then(registration=> {
                                          registration.unregister();
                                        }
                                        );
      }
      console.log('Service worker unregistered successfully');
    }

    render(){
      return (
        <div>
        </div>

      );

    }
}


WebPush.propTypes = {
  updateSubscription: PropTypes.func
}

export default WebPush;
