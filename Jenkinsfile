   node {
       stage 'Step 1: Test'
           build job: 'Service Testing/Unit testing/Notification Service Test', parameters: [[$class: 'StringParameterValue', name: 'Branch', value: '*/Development']]
       stage 'Step 2: Deploy to Integration'
           build job: 'Service Deployment/Deploy to Integration', parameters: [[$class: 'StringParameterValue', name: 'Repo', value: 'https://github.com/UKForeignOffice/loi-notification-service.git/'], [$class: 'StringParameterValue', name: 'Branch', value: 'Development'], [$class: 'StringParameterValue', name: 'Tag', value: 'notification-service-int'], [$class: 'StringParameterValue', name: 'Container', value: 'notification-service']]
   
      }
