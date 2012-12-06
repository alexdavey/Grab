let SessionLoad = 1
if &cp | set nocp | endif
let s:cpo_save=&cpo
set cpo&vim
imap <D-BS> 
imap <M-BS> 
imap <M-Down> }
inoremap <D-Down> <C-End>
imap <M-Up> {
inoremap <D-Up> <C-Home>
noremap! <M-Right> <C-Right>
noremap! <D-Right> <End>
noremap! <M-Left> <C-Left>
noremap! <D-Left> <Home>
imap <S-Tab> <Plug>SuperTabBackward
inoremap <C-Tab> 	
inoremap <silent> <SNR>37_yrrecord =YRRecord3()
imap <Right> <Nop>
imap <Left> <Nop>
imap <Down> <Nop>
imap <Up> <Nop>
nmap <silent>  :wincmd h
nmap <silent> <NL> :wincmd j
nmap <silent>  :wincmd k
nmap <silent>  :wincmd l
nnoremap <silent>  :YRReplace '1', 'p'
nnoremap <silent>  :YRReplace '-1', 'P'
noremap s :TCommentAs =&ft_
noremap n :TCommentAs =&ft 
noremap a :TCommentAs 
noremap b :TCommentBlock
vnoremap <silent> r :TCommentRight
vnoremap <silent> i :TCommentInline
nnoremap <silent> r :TCommentRight
onoremap <silent> r :TCommentRight
noremap   :TComment 
noremap <silent> p m`vip:TComment``
vnoremap <silent>  :TCommentMaybeInline
nnoremap <silent>  :TComment
onoremap <silent>  :TComment
nmap   :
map <silent> ,p <Plug>PeepOpen
vnoremap <silent> ,w :call EasyMotion#WB(1, 0)
onoremap <silent> ,w :call EasyMotion#WB(0, 0)
nnoremap <silent> ,w :call EasyMotion#WB(0, 0)
vnoremap <silent> ,t :call EasyMotion#T(1, 0)
onoremap <silent> ,t :call EasyMotion#T(0, 0)
vnoremap <silent> ,n :call EasyMotion#Search(1, 0)
onoremap <silent> ,n :call EasyMotion#Search(0, 0)
nnoremap <silent> ,n :call EasyMotion#Search(0, 0)
vnoremap <silent> ,k :call EasyMotion#JK(1, 1)
onoremap <silent> ,k :call EasyMotion#JK(0, 1)
nnoremap <silent> ,k :call EasyMotion#JK(0, 1)
vnoremap <silent> ,j :call EasyMotion#JK(1, 0)
onoremap <silent> ,j :call EasyMotion#JK(0, 0)
nnoremap <silent> ,j :call EasyMotion#JK(0, 0)
vnoremap <silent> ,gE :call EasyMotion#EW(1, 1)
onoremap <silent> ,gE :call EasyMotion#EW(0, 1)
nnoremap <silent> ,gE :call EasyMotion#EW(0, 1)
vnoremap <silent> ,f :call EasyMotion#F(1, 0)
onoremap <silent> ,f :call EasyMotion#F(0, 0)
nnoremap <silent> ,f :call EasyMotion#F(0, 0)
vnoremap <silent> ,e :call EasyMotion#E(1, 0)
onoremap <silent> ,e :call EasyMotion#E(0, 0)
nnoremap <silent> ,e :call EasyMotion#E(0, 0)
vnoremap <silent> ,b :call EasyMotion#WB(1, 1)
onoremap <silent> ,b :call EasyMotion#WB(0, 1)
vnoremap <silent> ,W :call EasyMotion#WBW(1, 0)
onoremap <silent> ,W :call EasyMotion#WBW(0, 0)
nnoremap <silent> ,W :call EasyMotion#WBW(0, 0)
vnoremap <silent> ,T :call EasyMotion#T(1, 1)
onoremap <silent> ,T :call EasyMotion#T(0, 1)
nnoremap <silent> ,T :call EasyMotion#T(0, 1)
vnoremap <silent> ,N :call EasyMotion#Search(1, 1)
onoremap <silent> ,N :call EasyMotion#Search(0, 1)
nnoremap <silent> ,N :call EasyMotion#Search(0, 1)
vnoremap <silent> ,ge :call EasyMotion#E(1, 1)
onoremap <silent> ,ge :call EasyMotion#E(0, 1)
nnoremap <silent> ,ge :call EasyMotion#E(0, 1)
vnoremap <silent> ,F :call EasyMotion#F(1, 1)
onoremap <silent> ,F :call EasyMotion#F(0, 1)
nnoremap <silent> ,F :call EasyMotion#F(0, 1)
vnoremap <silent> ,E :call EasyMotion#EW(1, 0)
onoremap <silent> ,E :call EasyMotion#EW(0, 0)
nnoremap <silent> ,E :call EasyMotion#EW(0, 0)
vnoremap <silent> ,B :call EasyMotion#WBW(1, 1)
onoremap <silent> ,B :call EasyMotion#WBW(0, 1)
nnoremap <silent> ,B :call EasyMotion#WBW(0, 1)
noremap ,_s :TCommentAs =&ft_
noremap ,_n :TCommentAs =&ft 
noremap ,_a :TCommentAs 
noremap ,_b :TCommentBlock
xnoremap <silent> ,_r :TCommentRight
nnoremap <silent> ,_r :TCommentRight
snoremap <silent> ,_r :TCommentRight
onoremap <silent> ,_r :TCommentRight
xnoremap <silent> ,_i :TCommentInline
noremap ,_  :TComment 
noremap <silent> ,_p vip:TComment
xnoremap <silent> ,__ :TCommentMaybeInline
nnoremap <silent> ,__ :TComment
snoremap <silent> ,__ :TComment
onoremap <silent> ,__ :TComment
nnoremap <silent> ,b :call EasyMotion#WB(0, 1)
nnoremap <silent> ,t :call EasyMotion#T(0, 0)
nmap ,q ,p
nmap ;r :w:RRB
nmap ;t :TagbarToggle
nmap ;R :RainbowParenthesesToggle
nmap ;l :so session.vim
nmap ;s :mksession! session.vim
nnoremap ;n :NumbersToggle
nmap ;g :GhciFile
nmap <silent> ;/ :nohlsearch
nmap ;rc :e $MYVIMRC
nmap ;S :cd ~/Sites/
nmap ;w <ctrl>ww
nmap @ :YRMapsMacro
imap § 
xnoremap <silent> P :YRPaste 'P', 'v'
nnoremap <silent> P :YRPaste 'P'
xmap S <Plug>VSurround
nmap \i ^df >>k$r,
nmap cs <Plug>Csurround
nmap ds <Plug>Dsurround
xnoremap <silent> d :YRDeleteRange 'v'
nmap gx <Plug>NetrwBrowseX
xmap gS <Plug>VgSurround
xnoremap <silent> gC :TCommentMaybeInline
nnoremap <silent> gCc :let w:tcommentPos = getpos(".") | set opfunc=tcomment#OperatorLineAnywayg@$
nnoremap <silent> gC :let w:tcommentPos = getpos(".") | set opfunc=tcomment#OperatorAnywayg@
xnoremap <silent> gc :TCommentMaybeInline
nnoremap <silent> gcc :let w:tcommentPos = getpos(".") | set opfunc=tcomment#OperatorLineg@$
nnoremap <silent> gc :let w:tcommentPos = getpos(".") | set opfunc=tcomment#Operatorg@
nnoremap <silent> gp :YRPaste 'gp'
nnoremap <silent> gP :YRPaste 'gP'
xnoremap <silent> p :YRPaste 'p', 'v'
nnoremap <silent> p :YRPaste 'p'
xnoremap <silent> x :YRDeleteRange 'v'
nmap ySS <Plug>YSsurround
nmap ySs <Plug>YSsurround
nmap yss <Plug>Yssurround
nmap yS <Plug>YSurround
nmap ys <Plug>Ysurround
xnoremap <silent> y :YRYankRange 'v'
map <M-Down> }
noremap <D-Down> <C-End>
map <M-Up> {
noremap <D-Up> <C-Home>
noremap <M-Right> <C-Right>
noremap <D-Right> <End>
noremap <M-Left> <C-Left>
noremap <D-Left> <Home>
nnoremap <silent> <Plug>NetrwBrowseX :call netrw#NetrwBrowseX(expand("<cWORD>"),0)
nnoremap <silent> <Plug>SurroundRepeat .
nnoremap <silent> <SNR>37_yrrecord :call YRRecord3()
map <Right> <Nop>
map <Left> <Nop>
map <Down> <Nop>
map <Up> <Nop>
vmap <BS> "-d
imap S <Plug>ISurround
imap s <Plug>Isurround
imap 	 <Plug>SuperTabForward
imap  <Plug>SuperTabForward
imap  <Plug>SuperTabBackward
imap  <Plug>Isurround
inoremap s :TCommentAs =&ft_
inoremap n :TCommentAs =&ft 
inoremap a :TCommentAs 
inoremap b :TCommentBlock
inoremap <silent> r :TCommentRight
inoremap   :TComment 
inoremap <silent> p :norm! m`vip:TComment``
inoremap <silent>  :TComment
imap [ []<Left>
inoremap jk 
abbr open :! open -a Google\ Chrome.app %:p
let &cpo=s:cpo_save
unlet s:cpo_save
set autoindent
set background=dark
set backspace=indent,eol,start
set fileencodings=ucs-bom,utf-8,default,latin1
set guifont=Bitstream\ Vera\ Sans\ Mono\ for\ Powerline:h12
set guioptions=egmrt
set guitablabel=%M%t
set helplang=en
set history=1000
set hlsearch
set ignorecase
set incsearch
set langmenu=none
set laststatus=2
set mouse=a
set omnifunc=javascriptcomplete#CompleteJS
set printexpr=system('open\ -a\ Preview\ '.v:fname_in)\ +\ v:shell_error
set runtimepath=~/.vim,~/.vim/bundle/FuzzyFinder,~/.vim/bundle/L9,~/.vim/bundle/Superior-Haskell-Interaction-Mode-SHIM,~/.vim/bundle/YankRing.vim,~/.vim/bundle/colorschemes,~/.vim/bundle/Command-T,~/.vim/bundle/numbers.vim,~/.vim/bundle/rainbow_parentheses.vim,~/.vim/bundle/supertab,~/.vim/bundle/syntastic,~/.vim/bundle/tcomment_vim,~/.vim/bundle/vim-autoclose,~/.vim/bundle/vim-easymotion,~/.vim/bundle/vim-fugitive,~/.vim/bundle/vim-peepopen,~/.vim/bundle/vim-powerline,~/.vim/bundle/vim-surround,/Applications/MacVim.app/Contents/Resources/vim/vimfiles,/Applications/MacVim.app/Contents/Resources/vim/runtime,/Applications/MacVim.app/Contents/Resources/vim/vimfiles/after,~/.vim/after
set shiftround
set shiftwidth=4
set showmatch
set smartcase
set smartindent
set smarttab
set splitbelow
set tabstop=4
set termencoding=utf-8
set visualbell
set wildignore=*.swp,.DS_Store
set wildmode=list:longest
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Sites/grab
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +0 ~/Sites/grab/src/main.js
args ~/Sites/grab/src/main.js
edit ~/Sites/grab/src/main.js
set splitbelow splitright
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
xnoremap <buffer> <silent> ,a} `>a}`<i{
xnoremap <buffer> <silent> ,a{ `>a}`<i{
xnoremap <buffer> <silent> ,a) `>a)`<i(
xnoremap <buffer> <silent> ,a( `>a)`<i(
xnoremap <buffer> <silent> ,a' `>a'`<i'
xnoremap <buffer> <silent> ,a] `>a]`<i[
xnoremap <buffer> <silent> ,a[ `>a]`<i[
xnoremap <buffer> <silent> ,a" `>a"`<i"
xnoremap <buffer> <silent> ,a` `>a``<i`
setlocal keymap=
setlocal noarabic
setlocal autoindent
setlocal balloonexpr=
setlocal nobinary
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
set colorcolumn=80
setlocal colorcolumn=80
setlocal comments=sO:*\ -,mO:*\ \ ,exO:*/,s1:/*,mb:*,ex:*/,://
setlocal commentstring=//%s
setlocal complete=.,w,b,u,t,i
setlocal concealcursor=
setlocal conceallevel=0
setlocal completefunc=
setlocal nocopyindent
setlocal cryptmethod=
setlocal nocursorbind
setlocal nocursorcolumn
set cursorline
setlocal cursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal noexpandtab
if &filetype != 'javascript'
setlocal filetype=javascript
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=croql
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=2
setlocal imsearch=2
setlocal include=
setlocal includeexpr=
setlocal indentexpr=
setlocal indentkeys=0{,0},:,0#,!^F,o,O,e
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=
setlocal nolinebreak
setlocal nolisp
setlocal nolist
setlocal nomacmeta
setlocal makeprg=
setlocal matchpairs=(:),{:},[:]
setlocal modeline
setlocal modifiable
setlocal nrformats=octal,hex
set number
setlocal nonumber
setlocal numberwidth=4
setlocal omnifunc=javascriptcomplete#CompleteJS
setlocal path=
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
set relativenumber
setlocal relativenumber
setlocal norightleft
setlocal rightleftcmd=search
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal smartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=[.?!]\\_[\\])'\"\	\ ]\\+
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=%!Pl#Statusline(0,1)
setlocal suffixesadd=
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != 'javascript'
setlocal syntax=javascript
endif
setlocal tabstop=4
setlocal tags=~/Sites/grab/.git/javascript.tags,~/Sites/grab/.git/tags,./tags,tags
setlocal textwidth=0
setlocal thesaurus=
setlocal noundofile
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal wrap
setlocal wrapmargin=0
silent! normal! zE
let s:l = 146 - ((57 * winheight(0) + 29) / 58)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
146
normal! 0
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
