package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

const (
	nvdBaseURL = "https://services.nvd.nist.gov/rest/json/cves/2.0"
)

type CVE_Metadata struct {
	ResultsPerPage  int    `json:"resultsPerPage"`
	StartIndex      int    `json:"startIndex"`
	TotalResults    int    `json:"totalResults"`
	Format          string `json:"format"`
	Version         string `json:"version"`
	Timestamp       string `json:"timestamp"`
	Vulnerabilities []struct {
		Cve struct {
			Id               string `json:"id"`
			SourceIdentifier string `json:"sourceIdentifier"`
			Published        string `json:"published"`
			LastModified     string `json:"lastModified"`
			VulnStatus       string `json:"vulnStatus"`
			Descriptions     []struct {
				Lang  string `json:"lang"`
				Value string `json:"value"`
			} `json:"descriptions"`
			Metrics struct {
				CvssMetricV31 []struct {
					Source   string `json:"source"`
					Type     string `json:"type"`
					CvssData struct {
						Version               string  `json:"version"`
						VectorString          string  `json:"vectorString"`
						AttackVector          string  `json:"attackVector"`
						AttackComplexity      string  `json:"attackComplexity"`
						Scope                 string  `json:"scope"`
						ConfidentialityImpact string  `json:"confidentialityImpact"`
						IntegrityImpact       string  `json:"integrityImpact"`
						AvailabilityImpact    string  `json:"availabilityImpact"`
						BaseScore             float64 `json:"baseScore"`
						BaseSeverity          string  `json:"baseSeverity"`
					} `json:"cvssData"`
					ExploitabilityScore float64 `json:"exploitabilityScore"`
					ImpactScore         float64 `json:"impactScore"`
				} `json:"cvssMetricV31,omitempty"`
				CvssMetricV2 []struct {
					Source   string `json:"source"`
					Type     string `json:"type"`
					CvssData struct {
						Version               string  `json:"version"`
						VectorString          string  `json:"vectorString"`
						AccessVector          string  `json:"accessVector"`
						AccessComplexity      string  `json:"accessComplexity"`
						Authentication        string  `json:"authentication"`
						ConfidentialityImpact string  `json:"confidentialityImpact"`
						IntegrityImpact       string  `json:"integrityImpact"`
						AvailabilityImpact    string  `json:"availabilityImpact"`
						BaseScore             float64 `json:"baseScore"`
					} `json:"cvssData"`
					BaseSeverity        string  `json:"baseSeverity"`
					ExploitabilityScore float64 `json:"exploitabilityScore"`
					ImpactScore         float64 `json:"impactScore"`
					AcInsufInfo         bool    `json:"acInsufInfo"`
				} `json:"cvssMetricV2,omitempty"`
				CvssMetricV30 []struct {
					Source   string `json:"source"`
					Type     string `json:"type"`
					CvssData struct {
						Version               string  `json:"version"`
						VectorString          string  `json:"vectorString"`
						AttackVector          string  `json:"attackVector"`
						AttackComplexity      string  `json:"attackComplexity"`
						Scope                 string  `json:"scope"`
						ConfidentialityImpact string  `json:"confidentialityImpact"`
						IntegrityImpact       string  `json:"integrityImpact"`
						AvailabilityImpact    string  `json:"availabilityImpact"`
						BaseScore             float64 `json:"baseScore"`
						BaseSeverity          string  `json:"baseSeverity"`
					} `json:"cvssData"`
					ExploitabilityScore float64 `json:"exploitabilityScore"`
					ImpactScore         float64 `json:"impactScore"`
				} `json:"cvssMetricV30,omitempty"`
			} `json:"metrics"`
			Weaknesses []struct {
				Source      string `json:"source"`
				Type        string `json:"type"`
				Description []struct {
					Lang  string `json:"lang"`
					Value string `json:"value"`
				} `json:"description"`
			} `json:"weaknesses"`
			Configurations []struct {
				Nodes []struct {
					Operator string `json:"operator"`
					Negate   bool   `json:"negate"`
					CpeMatch []struct {
						Vulnerable            bool   `json:"vulnerable"`
						Criteria              string `json:"criteria"`
						VersionEndIncluding   string `json:"versionEndIncluding,omitempty"`
						MatchCriteriaId       string `json:"matchCriteriaId"`
						VersionEndExcluding   string `json:"versionEndExcluding,omitempty"`
						VersionStartIncluding string `json:"versionStartIncluding,omitempty"`
					} `json:"cpeMatch"`
				} `json:"nodes"`
			} `json:"configurations"`
		} `json:"cve"`
	} `json:"vulnerabilities"`
}

type CVE struct {
	Name          string
	PublishedDate string
	Descriptions  []struct {
		Value string
	}
}

func main() {
	client := http.Client{Timeout: 10 * time.Second}
	// TODO: Include ?hasKEV , ?hasOval, ?isVulnerable
	// Only showing golang's vulnerabilities that are CRITICAL
	url := fmt.Sprintf("%s?keywordSearch=golang&keywordExactMatch&cvssV3Severity=CRITICAL", nvdBaseURL)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatalf("Failed to create HTTP request: %v", err)
	}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Failed to send HTTP request: %v", err)
	}
	defer resp.Body.Close()
	var metadata CVE_Metadata
	if err := json.NewDecoder(resp.Body).Decode(&metadata); err != nil {
		log.Fatalf("Failed to decode CVEMetadata: %v", err)
	}
	vulns := metadata.Vulnerabilities
	var cves []CVE
	for _, cve := range vulns {
		for _, description := range cve.Cve.Descriptions {
			cves = append(cves, CVE{
				Name:          cve.Cve.Id,
				PublishedDate: cve.Cve.Published,
				Descriptions: []struct {
					Value string
				}{
					{
						Value: description.Value,
					},
				},
			})
		}
	}
	// This is to print only CVEs published this year
	for _, cve := range cves {
		dateTimeLayout := "2006-01-02T15:04:05.999999999"
		parsedPublishedDate, err := time.Parse(dateTimeLayout, cve.PublishedDate)
		if err != nil {
			log.Fatal(err)
		}

		firstDayOfYear := fmt.Sprintf("%d-01-01T00:00:00", time.Now().Year())
		parsedFirstDayOfYearDate, err := time.Parse(dateTimeLayout, firstDayOfYear)
		if err != nil {
			log.Fatal(err)
		}
		if parsedPublishedDate.After(parsedFirstDayOfYearDate) {
			log.Println(cve)
		}
	}
}
