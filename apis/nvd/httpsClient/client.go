package httpsClient

import (
	"crypto/tls"
	"net/http"
	"time"
)

type Client struct {
	*http.Client
}

// NewClient creates a new HTTPS client with custom TLS configuration
func NewClient() *Client {
	// Define custom TLS configuration
	tlsConfig := &tls.Config{
		// Disable SSLv2 and SSLv3
		MinVersion: tls.VersionTLS12,

		// Prefer modern cipher suites
		CipherSuites: []uint16{
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
			tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,
		},

		// Use only secure elliptic curves
		CurvePreferences: []tls.CurveID{
			tls.X25519,
			tls.CurveP521,
			tls.CurveP384,
			tls.CurveP256,
		},
	}

	// Define HTTP client with custom timeout and TLS configuration
	client := &http.Client{
		Timeout: time.Second * 20,
		Transport: &http.Transport{
			TLSClientConfig: tlsConfig,
		},
	}

	return &Client{client}
}

// Get performs an HTTP GET request
func (c *Client) Get(url string) (*http.Response, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	return resp, nil
}
