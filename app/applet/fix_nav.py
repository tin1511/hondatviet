with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

old_block = '''              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={}
                >
                  <span>{lang.label}</span>
                </button>
              ))'''

new_block = '''              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer \${
                    language === lang.code
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'bg-stone-950/60 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
                  }`}
                >
                  <span>{lang.label}</span>
                </button>
              ))'''

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('src/components/Navbar.tsx', 'w') as f:
        f.write(content)
    print('Successfully fixed mobile menu button class.')
else:
    print('old_block not found.')
