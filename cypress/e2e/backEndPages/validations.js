class responce {
    validateRequestStatusCode(a, b) {
        expect(a).to.eql(b)
    }
    validateRequestDuration(c, d) {
        expect(c).to.be.lessThan(d)
    }
    validateRequestHeaders(e, f) {
        expect(e).to.eql(f)
    }
    validateResponceBodyProperty(g, h) {
        expect(g).to.have.property(h)
    }
}

export default responce;