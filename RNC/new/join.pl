$/=undef;
foreach my $f(@ARGV) {
    open I,"<$f";
    $_ = <I>;
    close I;
   s/^.*<body>//s;
   s/<\/body>.*$//s;
   s/[\r\n]+/ /gs;
   print "$_\n";
}
