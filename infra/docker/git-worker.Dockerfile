FROM golang:1.25-alpine

WORKDIR /workspace/services/git-worker
COPY services/git-worker ./
RUN go test ./...

CMD ["go", "run", "./cmd/gityard-git-worker"]
