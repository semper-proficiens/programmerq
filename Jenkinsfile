pipeline {
    agent any

    stages {
        stage('Podman Login') {
            steps {
                script {
                    // Use the credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: 'jfrog-non-admin-creds', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                        sh "echo $REGISTRY_PASS | podman login --tls-verify=false --username $REGISTRY_USER --password-stdin 192.168.0.32:8082"
                    }
                }
            }
        }

        stage('Podman Build') {
            steps {
                script {
                    sh '''
                        cd react-app
                        podman build --no-cache -t programmerq .
                    '''
                }
            }
        }
    }

    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}