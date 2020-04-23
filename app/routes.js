/**
 * Created by skaifem on 25/11/2015.
 */


module.exports = function(router, sendGrid,notify, configSendGrid,configNotify,templator) {

    // =====================================
    // HEALTHCHECK
    // =====================================
    router
    //process login form
        .get('/healthcheck', function (req, res) {
            res.json({message: 'Notification Service is running'});
        });

    // =====================================
    // CONFIRM EMAIL
    // =====================================
    router

        .post('/confirm-email', function (req, res) {

            //construct email from post request JSON
            var payload = new sendGrid.Email({
                to: req.body.to,
                from: configSendGrid.fromAddresses.test,
                subject: 'Confirm your email to activate your account',
                html: templator.emailConfirmationTemplate(req.body.token, configSendGrid.urls.userServiceURL)
            });
            console.info('Sending confirmation email');
            return res.json(sendEmail(req, res, payload));
        });

    // =====================================
    // SUBMISSION CONFIRMATION
    // =====================================

    router

        .post('/confirm-submission', function (req, res) {

            console.log('confirm submission output', req.body);
            console.log('test');

            var NotifyClient = require('notifications-node-client').NotifyClient

            var notifyClient = new NotifyClient("conor_test_api_key-6c19e868-f026-4ff4-86ed-8effb112c0cc-23decf65-ecc6-45bb-9fb9-696320d48544")

            if (req.body.service_type == 1) {//standard service

                notifyClient
                    .sendEmail("03acf3ba-0c95-438a-9ead-f6daadb8bb93", "c.mcgandy@kainos.com", {
                        personalisation: {
                            'first_name': 'Conor',
                            'application_reference': 'application_reference'
                        },
                        reference: "app submission notify test"
                    })
                    .then(response => console.log(response))
                    .catch(err => console.error(err))


                console.log('Sending submission confirmation email Notify for standard');
            }
            else if
                (req.body.service_type == 2) {//premium service

                    notifyClient
                        .sendEmail("6bc36b7a-dbd9-4363-b188-b3eed8c4fc79", "c.mcgandy@kainos.com", {
                            personalisation: {
                                'first_name': 'Conor',
                                'application_reference': 'application_reference'
                            },
                            reference: "app submission notify test"
                        })
                        .then(response => console.log(response))
                        .catch(err => console.error(err))


                    console.log('Sending submission confirmation email Notify for premium');
                }

        });



    // router
    //
    //     .post('/confirm-submission', function (req, res) {
    //
    //         //construct email from post request JSON
    //         var payload = new sendGrid.Email({
    //             to: req.body.to,
    //             from: configSendGrid.fromAddresses.test,
    //             subject: 'Legalisation application confirmation ' + req.body.application_reference,
    //             html: templator.submissionConfirmationTemplate(req.body.application_reference, req.body.send_information, configSendGrid.urls.applicationServiceURL, req.body.user_ref, req.body.service_type)
    //         });
    //         console.info('Sending submission confirmation email');
    //         return res.json(sendEmail(req, res, payload));
    //     });

    // =====================================
    // RESET PASSWORD
    // =====================================
    router

        .post('/reset-password', function (req, res) {

            //construct email from post request JSON
            var payload = new sendGrid.Email({
                to: req.body.to,
                from: configSendGrid.fromAddresses.test,
                subject: 'Reset password instructions',
                html: templator.resetPasswordTemplate(req.body.token, configSendGrid.urls.userServiceURL)
            });
            console.info('Sending reset password email');
            return res.json(sendEmail(req, res, payload));


        });
    // =====================================
    // PASSWORD UPDATED
    // =====================================
    router

        .post('/password-updated', function (req, res) {

            //construct email from post request JSON
            var payload = new sendGrid.Email({
                to: req.body.to,
                from: configSendGrid.fromAddresses.test,
                subject: 'Your password has been updated',
                html: templator.passwordUpdatedTemplate()
            });
            console.info('Sending updated password email');
            return res.json(sendEmail(req, res, payload));


        });

    // =====================================
    // ACCOUNT LOCKED
    // =====================================
    router

        .post('/account_locked', function (req, res) {

            //construct email from post request JSON
            var payload = new sendGrid.Email({
                to: req.body.to,
                from: configSendGrid.fromAddresses.test,
                subject: 'Your account has been locked',
                html: templator.accountLockedTemplate(req.body.name, req.body.to, configSendGrid.urls.userServiceURL)
            });
            console.info('Sending account locked email');
            return res.json(sendEmail(req, res, payload));


        });

    // =====================================
    // ACCOUNT EXPIRY WARNING
    // =====================================
    router

        .post('/expiry_warning', function (req, res) {

            //construct email from post request JSON
            var payload = new sendGrid.Email({
                to: req.body.to,
                from: configSendGrid.fromAddresses.test,
                subject: 'Your online account is about to expire: ' + req.body.to,
                html: templator.accountExpiringTemplate(configSendGrid.urls.userServiceURL, req.body.accountExpiryDateText, req.body.dayAndMonthText, req.body.to)
            });

            return res.json(sendEmail(req, res, payload));


        });
    // =====================================
    // ACCOUNT EXPIRY CONFIRMATION
    // =====================================
    router

        .post('/expiry_confirmation', function (req, res) {

            //construct email from post request JSON
            var payload = new sendGrid.Email({
                to: req.body.to,
                from: configSendGrid.fromAddresses.test,
                subject: 'Your online account has been deleted: ' + req.body.to,
                html: templator.accountExpiredTemplate(configSendGrid.urls.userServiceURL, req.body.to)
            });

            return res.json(sendEmail(req, res, payload));


        });

    // =====================================
    // FAILED DOCUMENTS
    // =====================================
    router

        .post('/failed-documents', function (req, res) {

            //construct email from post request JSON
            var payload = new sendGrid.Email({
                to: req.body.to,
                from: configSendGrid.fromAddresses.test,
                subject: 'How to get documents certified',
                html: templator.failedDocumentTemplate(req.body.failed_certs)
            });
            console.info('Sending failed eligibility email');
            return res.json(sendEmail(req, res, payload));
        });

};


// function sendEmail(req, res, payload) { //send the email via SendGrid
//     //use SendGrid template (GOV.UK)
//     payload.setFilters({
//         'templates': {
//             'settings': {
//                 'enable': 1,
//                 'template_id': configSendGrid.templates.emailTemplateId
//             }
//         }
//     });
//     payload.setFromName('Legalisation Office');
//     sendGrid.send(payload, function (err, json) {
//         if (err) {
//             console.error(err);
//             return false;
//         }
//         console.info('Email sent');
//         return json;
//     });
//
// }





