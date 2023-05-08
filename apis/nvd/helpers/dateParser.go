package helpers

import (
	"fmt"
	"time"
)

const (
	dateTimeLayout = "2006-01-02T15:04:05.999999999"
)

func ParseDate(date string) (time.Time, error) {
	parsedDateTime, err := time.Parse(dateTimeLayout, date)
	if err != nil {
		return time.Time{}, fmt.Errorf("failed to parse date: %s", err)
	}

	return parsedDateTime, nil
}
