package helpers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// CVEMetadata We don't need all of this, but leaving for reference
type CVEMetadata struct {
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

func CVEUnmarshall(resp *http.Response, metadata CVEMetadata) (*CVEMetadata, error) {
	if err := json.NewDecoder(resp.Body).Decode(&metadata); err != nil {
		return nil, fmt.Errorf("failed to decode CVEMetadata: %v", err)
	}
	return &metadata, nil
}
