const Nightmare = require('nightmare')
const vo = require('vo')
const nightmare = Nightmare({ show: true })

const user = process.env.BUSTARD_USER
const pass = process.env.BUSTARD_PASS

function *run() {
    yield nightmare
        .goto('https://twitter.com/login')
        .type('.js-username-field', user)
        .type('.js-password-field', pass)
        .type('.js-password-field', '\u000d')
        .wait(4000)
        .goto('https://twitter.com/who_to_follow/suggestions')

    for (var i = 0; i < 20; i++) {
      yield nightmare
        .refresh()
        .click('.stream button')
        .wait(2000)
    }
  
    yield nightmare.end()
}

vo(run)(function(err, result) {
    if (err) throw err
})