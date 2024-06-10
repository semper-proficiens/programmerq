pipeline {
    agent any

    stages {
        stage('Podman Login') {
            steps {
                script {
                    // Use the credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: 'jfrog-non-admin-creds', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                            sh 'podman login --tls-verify=false -u $REGISTRY_USER -p $REGISTRY_PASS 192.168.0.32:8082'
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

        stage('Podman Push to Artifactory') {
            steps {
                script {
                    sh '''
                        podman tag programmerq 192.168.0.32:8082/docker-local/programmerq
                        podman push --tls-verify=false 192.168.0.32:8082/docker-local/programmerq
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