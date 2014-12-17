while(<>) {
    if (/^([^,]+),(.*)$/) {
        my $name = $1;
 	my $rss = $2;
	$name =~ s/[^A-Za-z0-9]+/_/g;
	open O,">RNC-Speech-$name.rss" or die "failed to open $name";
	print O $rss;
	close O;
	}
    else {print STDERR "Error: $_";}
}
