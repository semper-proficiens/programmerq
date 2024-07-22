def BUILD_UUID

pipeline {
    agent any

    stages {

        stage('Generate UUID') {
            steps {
                script {
                    BUILD_UUID = java.util.UUID.randomUUID().toString()
                    echo "Random Build UUID: ${BUILD_UUID}"
                }
            }
        }

        stage('Podman Login') {
            steps {
                script {
                    // Use the credentials stored in Jenkins
                    withCredentials([string(credentialsId: 'private_artifactory_url', variable: 'ARTIFACTORY_URL')]) {
                        withCredentials([usernamePassword(credentialsId: 'jfrog-non-admin-creds', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                                sh 'podman login --tls-verify=false -u $REGISTRY_USER -p $REGISTRY_PASS $ARTIFACTORY_URL'
                        }
                    }
                }
            }
        }

        stage('Podman Build') {
            steps {
                script {
                    sh "cd react-app && podman build --no-cache -t programmerq:${BUILD_UUID} ."
                }
            }
        }

        stage('Podman Push to Artifactory') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'private_artifactory_url', variable: 'ARTIFACTORY_URL')]) {
                        sh "podman tag programmerq:${BUILD_UUID} $ARTIFACTORY_URL/docker-local/programmerq:${BUILD_UUID}"
                        sh "podman push --tls-verify=false $ARTIFACTORY_URL/docker-local/programmerq:${BUILD_UUID}"
                    }
                }
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'k8s_node_kubeconfig', variable: 'KUBECONFIG')]) {
                        sh "kubectl set image deployment/programmerq-frontend-deployment proq-fe=$ARTIFACTORY_URL/docker-local/programmerq:${BUILD_UUID}"
                        sh "kubectl rollout status deployment/programmerq-frontend-deployment"
                    }
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