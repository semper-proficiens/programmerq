package actions

import (
	"fmt"
	"golangProjects/nvdAPI/helpers"
	"golangProjects/nvdAPI/httpsClient"
	"log"
	"time"
)

type CVE struct {
	Name          string
	PublishedDate string
	Descriptions  []struct {
		Value string
	}
}

const (
	nvdBaseURL = "https://services.nvd.nist.gov/rest/json/cves/2.0"
)

func GetYearlyCVES() {
	c := httpsClient.NewClient()
	// TODO: Include ?hasKEV , ?hasOval, ?isVulnerable
	// Only showing golang's vulnerabilities that are CRITICAL
	url := fmt.Sprintf("%s?keywordSearch=golang&keywordExactMatch&cvssV3Severity=CRITICAL", nvdBaseURL)

	// send a GET request and obtain a response
	resp, err := c.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	var metadata helpers.CVEMetadata
	marshalledMetadata, err := helpers.CVEUnmarshall(resp, metadata)
	if err != nil {
		log.Fatal(err)
	}

	vulns := marshalledMetadata.Vulnerabilities
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

		publishedDate, err := helpers.ParseDate(cve.PublishedDate)
		if err != nil {
			log.Fatal(err)
		}

		firstDayOfYear := fmt.Sprintf("%d-01-01T00:00:00", time.Now().Year())
		parsedFirstDayOfYear, err := helpers.ParseDate(firstDayOfYear)
		if err != nil {
			log.Fatal(err)
		}
		if publishedDate.After(parsedFirstDayOfYear) {
			log.Println(cve)
		}
	}
}
